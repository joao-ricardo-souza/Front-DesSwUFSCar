import './Card.css';

interface CardProps {
  name: string;
  price: number;
  category: string;
  pictureUrl: string;
}

const Card: React.FC<CardProps> = ({ name, price, category, pictureUrl }) => {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price);
  
  return (
    <div className="borderDiv">
      <img alt={name} className="image" src={pictureUrl} />
      <div className="bodyDiv">
          <div className="textDiv">
              <p className="title">{name}</p>
              <p className="text">{category}</p>
              <p className="text">{formattedPrice}</p>
          </div>
          <div className="buttonDiv">
              <button className="editButton">Editar</button>
              <button className="deleteButton">Excluir</button>
          </div>
      </div>
    </div>
  );
}

export default Card;