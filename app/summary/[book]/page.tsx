import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

async function getBookContent(book) {
  const summariesDir = path.join(process.cwd(), 'summaries');
  const filePath = path.join(summariesDir, `${book}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}

export default async function BookSummary({ params }) {
  const { book } = params;
  const contentHtml = await getBookContent(book);
  const bookName = book.replace(/_/g, ' ');

  return (
    <div className="container mx-auto p-4">
      <Link href="/">
        <span className="text-blue-600 no-underline hover:underline mb-4 block">&larr; Back to Book List</span>
      </Link>
      <div className="summary bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl note-text text-base leading-7"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />      </div>
    </div>
  );
}
