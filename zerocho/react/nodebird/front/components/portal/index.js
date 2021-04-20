import { createPortal } from 'react-dom';

const containerId = '__portal';

let containerElement;

function Portal({ children }) {
  if (!containerElement) {
    containerElement = document.createElement('div');
    containerElement.id = containerId;
    document.body.appendChild(containerElement);
  }

  return createPortal(children, containerElement);
}

export { Portal };
