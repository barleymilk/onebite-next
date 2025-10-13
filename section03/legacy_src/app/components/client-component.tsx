"use client";
// import ServerComponent from "./server-components";

export default function ClientComponent({ children }: { children: string }) {
  console.log("클라이언트 컴포넌트");
  // return <ServerComponent />;
  return <div>{children}</div>;
}
