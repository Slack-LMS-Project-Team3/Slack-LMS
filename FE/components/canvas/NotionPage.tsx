<<<<<<< Updated upstream
'use client'; // CSR

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css'; 
import { NotionRenderer } from 'react-notion-x';
=======
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import { NotionRenderer } from "react-notion-x";
>>>>>>> Stashed changes

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

// SSR에서 안전하게 사용할 수 있도록 dynamic import 설정
const Code = dynamic(
  () => import("react-notion-x/build/third-party/code").then((m) => m.Code),
  {
    ssr: true, // SSR 활성화
    loading: () => <div>코드 블록 로딩 중...</div>
  },
);

const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection,
    ),
  {
    ssr: true, // SSR 활성화
    loading: () => <div>컬렉션 로딩 중...</div>
  },
);

const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then(
      (m) => m.Equation,
    ),
  {
    ssr: true, // SSR 활성화
    loading: () => <div>수식 로딩 중...</div>
  },
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: true, // SSR 활성화
    loading: () => <div>모달 로딩 중...</div>
  },
);

export default function NotionPage({ recordMap }: NotionPageProps) {
<<<<<<< Updated upstream
  const Code = dynamic(
    () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
    {
      ssr: false,
    },
  );
  const Collection = dynamic(
    () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
    {
      ssr: false,
    },
  );
  const Equation = dynamic(
    () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
    {
      ssr: false,
    },
  );
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
      ssr: false,
    },
  );
=======
>>>>>>> Stashed changes

  return (
    <div className="flex flex-1 justfy-start ml-10 max-h-screen">
      <div className=' flex flex-1 min-h-0 w-full overflow-y-auto scrollbar-thin'>
        <NotionRenderer
          recordMap={recordMap}
          fullPage
          darkMode={false}
          previewImages
          components={{
            Code,
            Collection,
            Equation,
            Modal,
            nextImage: Image,
            nextLink: Link,
          }}
        />
      </div>
    </div>
  );
}