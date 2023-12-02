import { useMapContext } from "../../../utils/MapState/MapContext";
const ColliderInfo = () => {
  const { state, dispatch } = useMapContext();

  return (
    <div className='collider-info flex  flex-row justify-around items-center h-full w-60'>
      <div className='collider-info__item__title'>
        View Colliders (Shift toggle)
      </div>
      <div className='collider-info__item__toggle'>
        <input
          type='checkbox'
          checked={state.colliderVision}
          onChange={async (e) => {
            console.log(e.target.checked);
            await dispatch({
              type: "SET_COLLIDER_VISION",
              payload: e.target.checked,
            });
          }}
        />
      </div>
    </div>
  );
};

export default ColliderInfo;
