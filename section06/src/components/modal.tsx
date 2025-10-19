"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

// modal : 화면 UI를 다 덮는 요소
// 일반적인 형태로 렌더링하면 페이지 컴포넌트 안의 하위 요소로써 렌더링 됨.
// 그러나 특정 컴포넌트 페이지의 div 태그 안에 모달이 들어있다고 하면 어색함.
// 따라서 돔 요소 아래에 고정적으로 모달 요소를 만들도록 만듦.
// dialog는 처음 렌더링 될 때는 꺼져 있는 상태
export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);
  return createPortal(
    <dialog
      // esc 키 -> 뒤로가기
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 배경 클릭 -> 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
