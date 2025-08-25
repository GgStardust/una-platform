import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export async function generateDOCX(content: string, title: string): Promise<Uint8Array> {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title
        new Paragraph({
          text: title,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
            before: 200
          }
        }),
        
        // Process content with better formatting
        ...processContentForDOCX(content)
      ],
    }],
  });

  return await Packer.toBuffer(doc);
}

// Process content to create properly formatted DOCX elements
function processContentForDOCX(content: string): Paragraph[] {
  const lines = content.split('\n');
  const elements: Paragraph[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      elements.push(new Paragraph({ text: '' }));
      continue;
    }
    
    // Detect headings
    if (trimmedLine.startsWith('# ')) {
      elements.push(new Paragraph({
        text: trimmedLine.substring(2),
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 300, before: 400 }
      }));
    } else if (trimmedLine.startsWith('## ')) {
      elements.push(new Paragraph({
        text: trimmedLine.substring(3),
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200, before: 300 }
      }));
    } else if (trimmedLine.startsWith('### ')) {
      elements.push(new Paragraph({
        text: trimmedLine.substring(4),
        heading: HeadingLevel.HEADING_3,
        spacing: { after: 150, before: 200 }
      }));
    } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      // Bold text (field labels)
      elements.push(new Paragraph({
        children: [
          new TextRun({
            text: trimmedLine.substring(2, trimmedLine.length - 2),
            bold: true,
            size: 24
          })
        ],
        spacing: { after: 120 }
      }));
    } else if (trimmedLine.startsWith('• ') || trimmedLine.startsWith('- ')) {
      // List items
      elements.push(new Paragraph({
        children: [
          new TextRun({
            text: '• ',
            size: 24
          }),
          new TextRun({
            text: trimmedLine.substring(2),
            size: 24
          })
        ],
        spacing: { after: 120 },
        indent: { left: 720 } // 0.5 inch indent
      }));
    } else if (trimmedLine.startsWith('---')) {
      // Separator lines
      elements.push(new Paragraph({
        children: [
          new TextRun({
            text: '─'.repeat(50),
            color: '666666'
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200, before: 200 }
      }));
    } else if (trimmedLine.includes(':')) {
      // Field labels and values
      const [label, value] = trimmedLine.split(':');
      if (label && value) {
        elements.push(new Paragraph({
          children: [
            new TextRun({
              text: label.trim() + ': ',
              bold: true,
              size: 24
            }),
            new TextRun({
              text: value.trim(),
              size: 24
            })
          ],
          spacing: { after: 120 }
        }));
      } else {
        elements.push(new Paragraph({
          text: trimmedLine,
          spacing: { after: 120 }
        }));
      }
    } else {
      // Regular text
      elements.push(new Paragraph({
        text: trimmedLine,
        spacing: { after: 120 }
      }));
    }
  }
  
  return elements;
}

export async function generateUNAAgreementDOCX(content: string): Promise<Uint8Array> {
  return generateDOCX(content, 'UNA Agreement');
}

export async function generateEINGuideDOCX(content: string): Promise<Uint8Array> {
  return generateDOCX(content, 'EIN Application Guide');
}

export async function generateLPUNA128DOCX(content: string): Promise<Uint8Array> {
  return generateDOCX(content, 'LP UNA 128 Filing Package');
}
