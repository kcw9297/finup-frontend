/**
 * /words 단어장 홈 대응 페이지 컴포넌트
 */

import React from 'react';
import MainLayout from '../../base/layouts/MainLayout';
import WordHome from '../../features/word/components/WordHome';

export default function WordHomePage() {
  return (
    <MainLayout>
      <WordHome />
    </MainLayout>
  );
}
