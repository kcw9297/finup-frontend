import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

// d3-cloud 직접 사용하여 SVG로 그리는 순수 컴포넌트(리액트 워드클라우드는 19버전 미지원)
// originalWords: 워드클라우드 배치를 계산할 원본 데이터 (뉴스 갱신 시 변경)
// displayWords: 필터 적용된 데이터 (색상·표시용, 배치에는 영향 없음)

export default function WordCloud({ originalWords, displayWords }) {
  const svgRef = useRef(null);
  const [layoutWords, setLayoutWords] = useState([]);

  // value 기반 글자 크기 스케일
  const fontScale = d3
    .scaleLinear()
    .domain([
      d3.min(originalWords, d => d.value),
      d3.max(originalWords, d => d.value)
    ])
    .range([16, 40]);

  // originalWords 변경 시에만 새 배치 계산
  useEffect(() => {
    if (!originalWords || originalWords.length === 0) return;

    const layout = cloud()
      .size([690, 200])
      .words(
        originalWords.map(w => ({
          text: w.text,
          size: fontScale(w.value)
        }))
      )
      .padding(6)
      .rotate(() => 0)
      .spiral("archimedean")
      .font("Pretendard")
      .fontSize(d => d.size)
      .on("end", words => {
        // d3-cloud가 계산한 위치를 중앙 기준으로 보정
        const avgX = d3.mean(words, d => d.x);
        const avgY = d3.mean(words, d => d.y);

        setLayoutWords(
          words.map(w => ({
            ...w,
            x: w.x - avgX,
            y: w.y - avgY
          }))
        );
      });

    layout.start();
  }, [originalWords]);

  // layoutWords 또는 displayWords 변경 시 SVG 렌더링
  useEffect(() => {
    if (!layoutWords.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 690;
    const height = 200;

    svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll("text")
      .data(layoutWords)
      .enter()
      .append("text")
      .style("font-size", d => `${d.size}px`)
      .style("font-family", "Pretendard")
      .style("font-weight", "600")
      .style("fill", d => {
        const match = displayWords.find(w => w.text === d.text);
        return match ? match.color : "#ccc";
      })
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .text(d => d.text);
  }, [layoutWords, displayWords]);

  return <svg ref={svgRef} width={690} height={200} />;
}