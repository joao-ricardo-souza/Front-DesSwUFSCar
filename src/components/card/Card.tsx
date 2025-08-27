import './Card.css';
import axios from 'axios';
import { useState } from 'react';

import { useNavigate } from "react-router";

const API_URL = "http://localhost:3001/api/product";

const Card: React.FC<Product> = ({ id, name, description, price, category, pictureUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Estados temporários para edição
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDescription, setEditedDescription] = useState(description);

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditedName(name);
    setEditedPrice(price);
    setEditedDescription(description);
    setEditedCategory(category);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const updatedProduct : NewProduct = {
        name: editedName,
        price: editedPrice,
        description: editedDescription,
        category: editedCategory,
        pictureUrl
      };

      const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
      console.log("Produto atualizado com sucesso:", response.data);
      setIsEditing(false);
      navigate("/");
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.preventDefault();
      
      const confirmed = window.confirm("Tem certeza que deseja deletar este produto?");
      if (!confirmed) return;

      try {
          const response = await axios.delete(`${API_URL}/${id}`);
          console.log("Produto criado com sucesso:", response.data);
          navigate("/");
      } catch (error: any) {
          console.error("Falha ao criar produto:", error.response?.data || error.message);
      }
  };

  return (
    <div className="borderDiv">
      <img alt={name} className="image" src={pictureUrl} />
      <div className="bodyDiv">
        <div className="textDiv">
          {isEditing ? (
            <>
              <input
                className="title"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}/>
              <input
                className="text"
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}/>
              <input
                className="text"
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(parseFloat(e.target.value))}/>
              <textarea
                className="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}/>
            </>
          ) : (
            <>
              <p className="title">{`${id} - ${name}`}</p>
              <p className="text">{category}</p>
              <p className="text">{formattedPrice}</p>
              <p className="text">{description}</p>
            </>
          )}
        </div>
        <div className="buttonDiv">
          {isEditing ? (
            <>
              <button className="editButton" onClick={handleSaveClick}>Salvar</button>
              <button className="deleteButton" onClick={handleCancelClick}>Cancelar</button>
            </>
          ) : (
            <>
              <button className="editButton" onClick={handleEditClick}>Editar</button>
              <button className="deleteButton" onClick={(e) => handleDelete(e, id)}>Excluir</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
