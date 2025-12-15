import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

// d3-cloud 직접 사용하여 SVG로 그리는 순수 컴포넌트(리액트 워드클라우드는 19버전 미지원)

export default function WordCloud({ originalWords, displayWords }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  // 부모 크기 상태
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [layoutWords, setLayoutWords] = useState([]);

  // 부모 크기 자동 감지
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setSize({ width: rect.width, height: rect.height });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // 스케일 기준(언급 빈도 계산)
  const LEVELS = {
    LOW: 1,
    MID: 2
  }

  // 글자 크기 스케일
  const getFontSize = (value) => {
    if (value <= LEVELS.LOW) return 14
    if (value <= LEVELS.MID) return 24
    return 34
  };

  // 색상 스케일
  const getColor = (value) => {
    if (value <= LEVELS.LOW) return "#b0c3eb"
    if (value <= LEVELS.MID) return "#003fbf"
    return "#002f8f"
  };

  // 뉴스가 바뀌거나 size가 바뀌면 레이아웃 다시 계산
  useEffect(() => {
    if (!originalWords.length) return;
    const layout = cloud()
      .size([size.width, size.height])
      .words(
        originalWords.map(w => ({
          text: w.text,
          size: getFontSize(w.value),
          value: w.value,
        }))
      )
      .padding(4)
      .rotate(() => 0)
      .spiral("archimedean")
      .font("Pretendard")
      .fontSize(d => d.size)
      .on("end", (words) => {
        // 중심 보정
        const avgX = d3.mean(words, w => w.x);
        const avgY = d3.mean(words, w => w.y);

        setLayoutWords(
          words.map(w => ({
            ...w,
            x: w.x - avgX,
            y: w.y - avgY
          }))
        );
      });

    layout.start();
  }, [originalWords, size]);

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
      .style("fill", d => getColor(d.value))
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .text(d => d.text);
  }, [layoutWords, displayWords, size]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}