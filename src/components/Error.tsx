import { useProjectContext } from "../utils/GlobalState/GlobalState";
import { SET_ERROR } from "../utils/GlobalState/actions";

const Error = () => {
  const { state, dispatch } = useProjectContext();

  return (
    state.error !== "" && (
      <div className='w-screen h-screen bg-black/50 absolute top-0 left-0 flex justify-center items-center'>
        <div className='shadow-xl border-3 border-black flex items-center flex-col bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-lg'>
          <h1>{state.error}</h1>
          <button
            className='bg-black/70 text-white px-5 py-1 rounded-md hover:bg-black/80 '
            onClick={async () =>
              await dispatch({ type: SET_ERROR, payload: "" })
            }
          >
            Ok
          </button>
        </div>
      </div>
    )
  );
};
export default Error;
