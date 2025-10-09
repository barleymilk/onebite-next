import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from ".//[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

export const getStaticPaths = () => {
  return {
    // 존재할 수 있는 파라미터 설정 -> 문자열로만 설정해야 정상적으로 인식
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // 폴백 옵션: 예외 상황 -> 대비책
    // <세 가지 옵션>
    // - false -> not found 페이지 -> 없는 페이지 취급
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // ! -> id가 무조건 있을것이라고 단언
  const book = await fetchOneBook(Number(id));

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) return "문제가 발생했습니다. 다시 시도하세요.";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.containerd}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
