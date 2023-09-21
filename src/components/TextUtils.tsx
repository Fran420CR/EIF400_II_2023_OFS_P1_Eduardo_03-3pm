export function renderLineNumbers(inputText: string): JSX.Element[] {
    const lines = inputText.split('\n');
    return lines.map((_, index) => <div key={index + 1}>{index + 1}</div>);
  }
  