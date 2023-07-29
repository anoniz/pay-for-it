                                                                import React from 'react';

const Action = (props) => (
  <div>
    <button
      className="big-button"
      onClick={props.handlePick}
      disabled={!props.hasOptions}
    >
      Who Pays The Bill?
      </button>
  </div>                                    
);

export default Action;
