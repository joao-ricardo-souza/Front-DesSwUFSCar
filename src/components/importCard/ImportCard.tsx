import './ImportCard.css'

const ImportCard: React.FC<ImportProduct> = ({selected, name, price, category, pictureUrl, onToggle }) => {
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
            <div className="Import-buttonDiv">
                <input
                    type="checkbox"
                    checked={selected}
                    onChange={onToggle}
                />
                <label className="buttonText">Importar</label>
            </div>
        </div>
        </div>
    );
};

export default ImportCard;