import React from 'react'
import { useEffect, useState } from 'react'


const ProfileStatusWithHook = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)
  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateUserStatus(status)
  }
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {!editMode &&
        <div>
          <span style={{ cursor: 'pointer' }} onDoubleClick={activateEditMode}>{props.status || '-----'}</span>
        </div>}
      {editMode &&
        <div>
          <input autoFocus
            onBlur={deactivateEditMode}
            type="text" value={status}
            onChange={onStatusChange} />
        </div>}
    </div>
  );
}

export default ProfileStatusWithHook 