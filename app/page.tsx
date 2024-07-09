import fs from 'fs';
import path from 'path';
import Link from 'next/link';

async function getBooks() {
  const summariesDir = path.join(process.cwd(), 'summaries');
  const filenames = fs.readdirSync(summariesDir);

  return filenames.map((filename) => ({
    name: filename.replace(/_/g, ' ').replace('.md', ''),
    path: filename,
  }));
}

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Summaries</h1>
      <div className="grid grid-cols-1 gap-6">
        {books.map((book) => (
          <div key={book.path} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{book.name}</h2>
            <Link href={`/summary/${book.path.replace('.md', '')}`}>
              <span className="text-blue-600 no-underline hover:underline">Read Summary &rarr;</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
