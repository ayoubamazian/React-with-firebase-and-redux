import CategoryItems from "../categoryItems/CategoryItems";

const Directory = ({categories}) => {
    return ( 
        <div className="categories-container">
            {categories.map((categorie) => (
                <CategoryItems key={categorie.id} category={categorie} />
            ))}
        </div>
     );
}
 
export default Directory;