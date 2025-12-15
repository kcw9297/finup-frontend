import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

// 퍼센트 기반 워드클라우드
// - 키워드를 빈도순으로 정렬
// - 전체를 100%로 보고 단계 분배

export default function WordCloud({ originalWords }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const [size, setSize] = useState({ width: 300, height: 200 });
  const [layoutWords, setLayoutWords] = useState([]);

  // 크기 자동 감지
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      setSize({ width: rect.width, height: rect.height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // 단계 스타일 정의
  const LEVEL_STYLE = {
    1: { size: 15, color: "#b0c3eb" },
    2: { size: 25, color: "#003fbf" },
    3: { size: 35, color: "#002f8f" },
  };

  // 퍼센트 기준 계산
  const wordsWithLevel = useMemo(() => {
    if (!originalWords.length) return [];

    // 빈도 기준 내림차순 정렬
    const sorted = [...originalWords].sort((a, b) => b.value - a.value);
    const total = sorted.length;

    return sorted.map((word, index) => {
      const percent = (index / total) * 100;
      let level = 1;
      if (percent < 10) level = 3;
      else if (percent < 40) level = 2;
      return {
        ...word,
        level,
      };
    });
  }, [originalWords]);

  // 워드클라우드 레이아웃
  useEffect(() => {
    if (!wordsWithLevel.length) return;
    const layout = cloud()
      .size([size.width, size.height])
      .words(
        wordsWithLevel.map(w => ({
          text: w.text,
          size: LEVEL_STYLE[w.level].size,
          level: w.level,
        }))
      )
      .padding(4)
      .rotate(() => 0)
      .spiral("archimedean")
      .font("Pretendard")
      .fontSize(d => d.size)
      .on("end", words => {
        const avgX = d3.mean(words, w => w.x);
        const avgY = d3.mean(words, w => w.y);
        setLayoutWords(
          words.map(w => ({
            ...w,
            x: w.x - avgX,
            y: w.y - avgY,
          }))
        );
      });

    layout.start();
  }, [wordsWithLevel, size]);

  // SVG 렌더링
  useEffect(() => {
    if (!layoutWords.length) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg
      .append("g")
      .attr("transform", `translate(${size.width / 2}, ${size.height / 2})`)
      .selectAll("text")
      .data(layoutWords)
      .enter()
      .append("text")
      .style("font-size", d => `${d.size}px`)
      .style("font-family", "Pretendard")
      .style("font-weight", 700)
      .style("fill", d => LEVEL_STYLE[d.level].color)
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .text(d => d.text);
  }, [layoutWords, size]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}