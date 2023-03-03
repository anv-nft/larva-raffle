import {Modal} from "react-bootstrap";
import styles from "../mypage/MyPage.module.scss";
import popIcon from "../../assets/images/icon/pop_icon.svg";
import React, {useEffect, useState} from "react";
import {POST} from "../../api/api";

function ShippingView({shippingView, setShippingView,productTokenId, setNftTokenId, postUse, apiToken, address,  }) {
    const [viewForm, setViewForm] = useState(['Name', 'Hp', 'Zip', 'Address', 'Address2']);
    // 교환정보확인 모달
    const [viewModalShow, setViewModalShow] = useState(false);
    const viewModalOpen = () => setViewModalShow(true);
    const viewModalClose = () => {
        setViewModalShow(false);
        setShippingView(false);
        setNftTokenId()
    }
    useEffect(() => {
        if(productTokenId){
            async function viewAddressFormFadeIn(productTokenId) {
                const res = await POST(`/api/v1/raffle/address/info`, {address,productTokenId}, apiToken);
                console.log(res);
                setViewForm([res.data?.name, res.data?.hp, res.data?.zip, res.data?.address, res.data?.address2]);
                viewModalOpen();
            }
            viewAddressFormFadeIn(productTokenId);
        }

    },[shippingView])
    return (
        <>
            {/*배송정보 확인 모달*/}
            <Modal size="lg" show={viewModalShow} onHide={viewModalClose}>
                <Modal.Header>
                    <Modal.Title className="mx-auto">My Ticket 신청정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span className={styles.pop_title}><img src={popIcon} alt={"paper icon"}/> 개인정보</span>
                        <div className={styles.pop_form}>
                            <label>성명</label>
                            {viewForm[0]}
                        </div>
                        <div className={styles.pop_form}>
                            <label>연락처</label>
                            {viewForm[1]}
                        </div>
                        {postUse &&
                            <div className={styles.pop_form}
                                 style={{display: "flex", borderBottom: "3px solid #999"}}>
                                <label>주소</label>
                                <div style={{width: "calc(100% - 120px)"}}>
                                    {viewForm[2]}<br/>
                                    {viewForm[3]}<br/>
                                    {viewForm[4]}
                                </div>
                            </div>
                        }
                        <span style={{color: "red"}}>* TokenID : #{parseInt(productTokenId, 16)}</span><br/>
                        <div className={styles.btnBox}>
                            <button onClick={viewModalClose}>
                                닫기
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ShippingView;
