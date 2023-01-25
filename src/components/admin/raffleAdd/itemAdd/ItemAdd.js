function ItemAdd({idx}) {
    return (<>
            <table className="item_table">
                <thead></thead>
                <tbody>
                    <tr>
                        <td rowSpan={3}>{idx + 1}</td>
                        <td>상품명</td>
                        <td colSpan={2}><input name={`itemTitle[]`}/></td>
                        <td>배송여부</td>
                        <td>Y: <input type={"radio"} name={`itemNeedAddr[]`} value={'Y'}/>&nbsp;
                            N: <input type={"radio"} name={`itemNeedAddr[]`} value={'N'}/>
                        </td>
                    </tr>
                    <tr>
                        <td>설명</td>
                        <td colSpan={5}><input name={`itemDescription[]`}/></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td><input name={`itemPrice[]`}/></td>
                        <td>KANV</td>
                        <td>이미지</td>
                        <td><input name={`itemImage[]`} type={"file"}/></td>
                    </tr>
                </tbody>
            </table>
        </>)
}

export default ItemAdd
