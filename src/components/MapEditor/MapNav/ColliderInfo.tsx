import React from "react";
import { useEffect, useState } from "react";
import { useMapContext } from "../../../utils/MapState/MapContext";
const ColliderInfo = () => {
  const { state, dispatch } = useMapContext();

  return (
    <div className='collider-info'>
      <div className='collider-info__item'>
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
      <div className='collider-info__item'>
        <div className='collider-info__item__title'>
          Add Collider (Ctrl toggle)
        </div>
        <div className='collider-info__item__toggle'>
          <input
            type='checkbox'
            checked={state.addingCollider}
            onChange={async (e) => {
              await dispatch({
                type: "SET_ADDING_COLLIDER",
                payload: e.target.checked,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ColliderInfo;
