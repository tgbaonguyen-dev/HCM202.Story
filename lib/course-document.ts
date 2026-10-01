import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type CourseDocument = Readonly<{
  introductionAndInevitability: string;
  classAndNation: string;
  leadershipRoles: string;
  ethicsAndCivilization: string;
  constructionAndRectification: string;
  peopleApplicationAndConclusion: string;
}>;

const documentPath: string = join(process.cwd(), 'docs', 'web-content.md');
// Hot reload trigger
const source: string = readFileSync(documentPath, 'utf8').trim();

function extractRange(content: string, start: string, end: string | null): string {
  const startIndex: number = content.indexOf(start);
  if (startIndex < 0) throw new Error(`Missing start marker in docs/web-content.md: ${start}`);
  const endIndex: number = end === null ? content.length : content.indexOf(end, startIndex + start.length);
  if (endIndex < 0) throw new Error(`Missing end marker in docs/web-content.md: ${end}`);
  return content.slice(startIndex, endIndex).trim();
}

export const courseDocument: CourseDocument = {
  introductionAndInevitability: extractRange(source, '**ĐẢNG CỦA GIAI CẤP CÔNG NHÂN VÀ CỦA DÂN TỘC VIỆT NAM**', '# **III. Bản chất giai cấp gắn với tính dân tộc**'),
  classAndNation: extractRange(source, '# **III. Bản chất giai cấp gắn với tính dân tộc**', '# **IV. Ba vai trò lãnh đạo của Đảng**'),
  leadershipRoles: extractRange(source, '# **IV. Ba vai trò lãnh đạo của Đảng**', '# **V. Điều kiện để Đảng làm tròn vai trò**'),
  ethicsAndCivilization: extractRange(source, '# **V. Điều kiện để Đảng làm tròn vai trò**', '## **Đảng phải thường xuyên xây dựng và chỉnh đốn**'),
  constructionAndRectification: extractRange(source, '## **Đảng phải thường xuyên xây dựng và chỉnh đốn**', '## **Con người là yếu tố quyết định việc thực hiện đường lối**'),
  peopleApplicationAndConclusion: extractRange(source, '## **Con người là yếu tố quyết định việc thực hiện đường lối**', null),
};
