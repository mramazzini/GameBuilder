const filterFileName = (fileName: string) => {
  const index = fileName.lastIndexOf(".");
  const prefix = fileName.lastIndexOf("_") + 1;
  return fileName.substring(prefix, index);
};
interface RenderFileProps {
  file: File;
  level: number;
  lastElement: boolean;
}

interface File {
  name: string;
  isFolder: boolean;
  children: File[];
}

const RenderFile: React.FC<RenderFileProps> = ({
  file,
  level,
  lastElement,
}) => {
  return (
    <button
      className={`hover:bg-black/50 w-full bg-black py-1 flex w-full min-w-max justify-between ${
        lastElement ? "border-b border-white/25" : ""
      }`}
    >
      <span style={{ paddingLeft: `${0.75 * level + 1}rem ` }} key={file.name}>
        - {filterFileName(file.name)}
      </span>
      <span className='float-right text-xs text-gray-400 px-2'>
        ({file.name.substring(file.name.lastIndexOf(".") + 1)})
      </span>
    </button>
  );
};

export default RenderFile;
