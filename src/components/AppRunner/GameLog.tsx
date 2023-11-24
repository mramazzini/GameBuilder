import { useProjectContext } from "../../utils/GlobalState/GlobalState";
import React, { useEffect, useRef } from "react";
import CommandLine from "./CommandLine";
const GameLog = () => {
  const { state, dispatch } = useProjectContext();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when state.stdLog changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [state.stdLog]);

  return (
    <div className='bg-black/75  border-b border-white/25 '>
      <div
        ref={containerRef}
        className='scroll-active'
        style={{
          userSelect: "text",
          height: "calc(100vh - 7rem)",
        }}
      >
        {state.stdLog.map((log, index) => {
          return (
            <div
              style={{ whiteSpace: "pre-wrap" }}
              className='text-white text-sm font-bold font-mono py-1 px-5 border-b border-white/25'
              key={index}
            >
              {log.timestamp} {log.message}
            </div>
          );
        })}
      </div>
      <CommandLine />
    </div>
  );
};

export default GameLog;
