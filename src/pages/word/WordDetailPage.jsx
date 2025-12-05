/**
 * /words/:wordId 단어 상세 페이지
 */

import React from 'react';
import MainLayout from '../../base/layouts/MainLayout';
import WordDetail from '../../features/word/components/WordDetail';

export default function WordDetailPage() {
  return (
    <MainLayout>
      <WordDetail />
    </MainLayout>
  );
}

