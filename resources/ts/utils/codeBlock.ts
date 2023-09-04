const codeBlockTemplate = `
<pre class="code-block"><div class="header-code"><span class="code-lang">{language}</span><button class="copy-code"><svg class="w-6 h-6" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg></button></div><code class="{classes}">{content}</code></pre>`;

const copyLabel = `<svg class="w-6 h-6" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>`;

const copiedLabel = `<span>Copied! 😎</span><svg class="w-6 h-6" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>`;

export function codeBlockReplace(HTMLString: string) {
  const regex = /<pre><code class="([^"]*)">([\s\S]*?)<\/code><\/pre>/g;
  const modifiedHTMLString = HTMLString.replace(
    regex,
    (_, classes, content) => {
      const language = classes.split(' ')[0].split('-')[1];
      return codeBlockTemplate
        .replace('{language}', language)
        .replace('{classes}', classes)
        .replace('{content}', content);
    },
  );

  return modifiedHTMLString;
}

export function codeBlockCopy() {
  const codeBlocks = document.querySelectorAll('pre.code-block');

  codeBlocks.forEach((block) => {
    // only add button if browser supports Clipboard API
    if (navigator.clipboard) {
      const button = block.querySelector(
        'button.copy-code',
      ) as HTMLButtonElement;

      if (button) {
        button.addEventListener('click', async () => {
          await copyCode(block, button);
        });
      }
    }
  });

  async function copyCode(block: Element, button: HTMLButtonElement) {
    const code = block.querySelector('code');
    if (code) {
      const text = code.innerText;

      await navigator.clipboard.writeText(text);

      button.innerHTML = copiedLabel;

      setTimeout(() => {
        button.innerHTML = copyLabel;
      }, 2500);
    }
  }
}
