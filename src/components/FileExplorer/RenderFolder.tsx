import arrow from "../../assets/arrow.png";
import RenderFile from "./RenderFile";

interface File {
  name: string;
  isFolder: boolean;
  children: File[];
}

const RenderFolder = (file: File, level: number) => {
  return (
    <div style={{ paddingLeft: `${0.75 * level}rem ` }}>
      <div className='flex flex-row items-center py-1 bg-black/70 font-bold capitalize border-b border-white/25'>
        {file.isFolder ? <img className='w-3 h-3 mr-1 ' src={arrow} /> : null}
        {file.name}
      </div>

      {file.children.map((child, index) => {
        if (child.isFolder) {
          return RenderFolder(child, level + 1);
        } else {
          {
            return index === file.children.length - 1 ? (
              <RenderFile file={child} level={level + 1} lastElement={true} />
            ) : (
              <RenderFile file={child} level={level + 1} lastElement={false} />
            );
          }
        }
      })}
    </div>
  );
};

export default RenderFolder;
