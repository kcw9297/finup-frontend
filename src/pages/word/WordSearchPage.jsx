/**
 * /words/search 단어장 검색 페이지
 */

import React from 'react';
import MainLayout from '../../base/layouts/MainLayout';
import WordSearch from '../../features/word/components/WordSearch';

export default function WordSearchPage() {
  return (
    <MainLayout>
      <WordSearch />
    </MainLayout>
  );
}
