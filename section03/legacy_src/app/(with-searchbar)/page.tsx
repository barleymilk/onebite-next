import ClientComponent from "../components/client-component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>클라이언트컴포넌트</ClientComponent>
    </div>
  );
}
