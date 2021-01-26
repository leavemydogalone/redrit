import React, { useEffect, useState } from 'react';

export default function NewGroupForm({ setGroup, group }) {
  return (
    <div className="newGroupForm">
      <label htmlFor="newGroup">
        <input
          type="text"
          name="newGroup"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="Enter new group here"
          minLength="2"
          required
        />
      </label>
    </div>
  );
}
