import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../utils/redux/store";
import { setColliderVision } from "../../../utils/redux/reducers/MapReducers";
const ColliderInfo = () => {
  const state = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();
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
            await dispatch(setColliderVision(e.target.checked));
          }}
        />
      </div>
    </div>
  );
};

export default ColliderInfo;
