import Link from 'next/link';

export default function Home() {
  
  return (
    <div className='w-10/12 mx-auto '>
      <h1 className='font-bold text-4xl text-center py-5'>LINE de Reserve</h1>
      <div className="links flex flex-col gap-8">
        <Link href="./linetest/">ブロードキャストメッセージのためのページへ</Link>
        <Link href="./api/sampleapi">APIテスト</Link>

        <form action="./api/sampleapi" method='POST'>
          <div>
            <label htmlFor="name">なまえ</label>
            <input type="text" id="name" name='name' />
          </div>
          <button type="submit">そうしん</button>
        </form>

      </div>
    </div>
  );
}
