function ItemAdd({idx}) {
    return (
        <>
            <table class="item_table">
                <tr>
                    <td rowSpan={3}>{idx+1}</td>
                    <td>상품명</td>
                    <td colspan="5"><input name={`itemTitle[]`}/></td>
                </tr>
                <tr>
                    <td>설명</td>
                    <td colspan="5"><input name={`itemDescription[]`}/></td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td><input name={`itemPrice[]`}/></td>
                    <td>KANV</td>
                    <td>이미지</td>
                    <td><input name={`itemImage[]`} type={"file"}/></td>
                </tr>
            </table>
        </>
    )
}

export default ItemAdd
