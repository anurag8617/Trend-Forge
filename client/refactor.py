import os
import glob
import re

pages_dir = r"D:\project\TrendForge\client\src\pages"
files = glob.glob(os.path.join(pages_dir, "*.jsx"))

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<Sidebar />' not in content:
        continue
        
    print(f"Refactoring {os.path.basename(filepath)}")
    
    # Remove imports
    content = re.sub(r"import Sidebar from ['\"]\.\./components/Sidebar['\"];?\n?", "", content)
    content = re.sub(r"import Header from ['\"]\.\./components/Header['\"];?\n?", "", content)
    
    # Replace the opening wrapper
    # Matches <div className="...">\n <Sidebar />\n <main ...>\n <Header />
    # and keeps any extra props like onMouseMove
    
    pattern_open = re.compile(
        r'<div([^>]*className="flex h-screen bg-\[#111113\].*?"[^>]*)>\s*<Sidebar />\s*<main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-\[#111113\]">\s*<Header />',
        re.DOTALL
    )
    
    def repl_open(match):
        props = match.group(1)
        # Remove className from props because we don't need the outer layout classes anymore
        props = re.sub(r'className="[^"]*"', '', props).strip()
        
        # If there are remaining props (like onMouseMove), put them on a fragment or div
        if props:
            return f'<div {props} className="h-full flex flex-col">'
        else:
            return '<>'
            
    content, count = pattern_open.subn(repl_open, content)
    
    # Replace closing wrapper
    # Matches </main>\n</div>
    if count > 0:
        # We need to replace the exact corresponding closing tags.
        # It's always at the end of the return statement.
        # Find the last </main>\s*</div>
        pattern_close = re.compile(r'</main>\s*</div>\s*\)?\s*;\s*}\s*export default', re.DOTALL)
        
        def repl_close(match):
            # Based on what we opened with
            if 'className="h-full flex flex-col"' in content: # a bit hacky but works for this specific codebase
                return '</div>\n  );\n}\n\nexport default'
            else:
                return '</>\n  );\n}\n\nexport default'
                
        content = pattern_close.sub(repl_close, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(" -> Success")
    else:
        print(" -> Failed to match opening wrapper pattern")
