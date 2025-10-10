// export default function Page(props) {
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // console.log(props);
  const { q } = await searchParams;
  return <div>Search 페이지 : {q}</div>;
}
