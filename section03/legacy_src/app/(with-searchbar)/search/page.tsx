import ClientComponent from "@/app/components/client-component";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div>
      Search 페이지 : {q}
      <ClientComponent>클라이언트컴포넌트</ClientComponent>
    </div>
  );
}
