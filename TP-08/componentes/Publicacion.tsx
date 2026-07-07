import './Publicacion.css'
import { Publicaciones } from './interfaces/Publicaciones'

  interface PublicacionProps {
    publicacion: Publicaciones
    onSelect: () => void
    toggleLike: (id: number) => void
  }


  function Publicacion({
    publicacion,
    onSelect,
    toggleLike
    
  }: PublicacionProps) {
    return (
      <li
        className="publicacionItem"
        onClick={onSelect}
      >
        <img
          className="imagenPublicacion"
          src={publicacion.imagen}
          alt={publicacion.nombreUsuario}
        />

        <div className="footerPublicacion">
          <div className="publicacionHeader">
            <img
              src={publicacion.imagenUsuario}
              alt={publicacion.nombreUsuario}
            />

            <h2>{publicacion.nombreUsuario}</h2>
          </div>

          <div className="botonesPublicacion">
            <svg
      onClick={(e) => {
      e.stopPropagation()
      toggleLike(publicacion.id)
    }}
    className={publicacion.liked ? 'likeActivo' : ''}
    viewBox="0 0 20 20"
    fill="none"
  >
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
          </svg>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </li>
  )
}

export default Publicacion