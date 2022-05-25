import React from "react"



const Categories = () => {

    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]
    const onClickCategory = (index) => {
        setActiveIndex(index)
    }



    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => (
                        <li
                            key={index}
                            className={index === activeIndex ? 'active' : ''}
                            onClick={() => onClickCategory(index)}>
                            {category}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories