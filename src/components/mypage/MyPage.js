import React, {useEffect, useRef, useState} from 'react'
import {Modal, Button} from 'react-bootstrap';
import DaumPostcode from "react-daum-postcode";
import Caver from "caver-js";
import {POST} from "../../api/api";
import styles from "./MyPage.module.scss";
import {RAFFLE_NFT} from "../../utils/abi/RAFFLE_NFT";
import {contracts} from "../../utils/web3/contracts";
import popIcon from "../../assets/images/icon/pop_icon.svg"
import ShippingView from "../common/ShippingView";
import Pagination from "../common/Pagination";

function MyPage(props) {
    const RAFFLE_NFT_CONTRACT_ADDRESS = contracts['raffle_nft_contract'][props.networkId];
    const [myRaffleList, setMyRaffleList] = useState([]);
    const [productTokenId, setProductTokenId] = useState(); //선택한 상품
    const [product, setProduct] = useState(); //선택한 상품
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    // 교환정보 입력 모달
    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {
        setModalShow(false);
        setPostUseState(false);
    }
    const modalOpen = () => setModalShow(true);
    const agreeBox = useRef();
    const formName = useRef();
    const formPhoneNumber1 = useRef();
    const formPhoneNumber2 = useRef();
    const formPhoneNumber3 = useRef();
    const formPostZip = useRef();
    const formPostAddress = useRef();
    const formPostAddress2 = useRef();
    const [agreeState, setAgreeState] = useState(false); // 동의 여부
    const [postUseState, setPostUseState] = useState(false); // 주소 사용 여부
    // 주소창 모달
    const [postModalShow, setPostModalShow] = useState(false);
    const postModalClose = () => setPostModalShow(false);
    const postModalOpen = () => setPostModalShow(true);

    const [homeAddress, setHomeAddress] = useState([]);

    function addressFormFadeIn(tokenId, postUse, item) {
        setProductTokenId(tokenId);
        setProduct(item)
        if (postUse === 'Y') {
            setPostUseState(true);
        }
        modalOpen();
    }

    const [shippingView, setShippingView] = useState(false);

    async function viewAddressFormFadeIn(tokenId, postUse) {
        setPostUseState(postUse);
        setProductTokenId(tokenId);
        setShippingView(true);
    }

    async function addressSend(nftToken) {
        if (!agreeState) {
            alert("개인정보 수집 약관에 동의 해주세요.");
            console.log(agreeBox.current);
            return agreeBox.current.focus();
        }
        const regName = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
        if (formName.current.value === "") {
            alert("성명을 입력해주세요.");
            return formName.current.focus();
        }
        if (regName.test(formName.current.value) === false) {
            alert("성명은 한글 또는 영문 한가지만 사용 가능합니다.");
            return formName.current.focus();
        }

        if (formPhoneNumber1.current.value === "") {
            alert("연락처 앞자리를 선택해주세요.");
            return formPhoneNumber1.current.focus();
        }
        if (formPhoneNumber2.current.value === "") {
            alert("연락처를 입력해주세요.");
            return formPhoneNumber2.current.focus();
        }
        const regPhone2 = /([0-9]{3,4})$/;
        if (regPhone2.test(formPhoneNumber2.current.value) === false) {
            alert("숫자 3~4자리를 입력해주세요.");
            return formPhoneNumber2.current.focus();
        }
        if (formPhoneNumber3.current.value === "") {
            alert("연락처를 입력해주세요.");
            return formPhoneNumber3.current.focus();
        }
        const regPhone3 = /([0-9]{4})$/;
        if (regPhone3.test(formPhoneNumber3.current.value) === false) {
            alert("숫자 4자리를 입력해주세요.");
            return formPhoneNumber3.current.focus();
        }
        if (postUseState) {
            if (formPostZip.current.value === "" || formPostAddress.current.value === "") {
                alert("주소를 입력해주세요.");
                return formPostZip.current.focus();
            }
            if (formPostAddress2.current.value === "") {
                alert("상세주소를 입력해주세요.");
                return formPostAddress2.current.focus();
            }
        }
        try {
            let saveData = {
                tokenId: nftToken,
                ownerId: props.accounts,
                exchangeName: formName.current.value,
                exchangeHp: `${formPhoneNumber1.current.value}-${formPhoneNumber2.current.value}-${formPhoneNumber3.current.value}`,
            }
            if (postUseState) {
                let postData = {
                    exchangeZip: formPostZip.current.value,
                    exchangeAddress: formPostAddress.current.value,
                    exchangeAddress2: formPostAddress2.current.value
                }
                saveData = Object.assign(saveData, postData);
            }
            const saveResult = await POST(`/api/v1/raffle/address/save`, saveData, props.apiToken);
            if (saveResult.result === 'success') {
                const provider = window['klaytn'];
                const caver = new Caver(provider);
                const kip17instance = new caver.klay.Contract(RAFFLE_NFT, RAFFLE_NFT_CONTRACT_ADDRESS);
                const gasLimit = await kip17instance.methods.exchange(nftToken).estimateGas({
                    from: props.accounts,
                })
                const gasPrice = await caver.rpc.klay.getGasPrice();
                await kip17instance.methods.exchange(nftToken).send({
                    from: props.accounts,
                    gas: gasLimit,
                    gasPrice,
                }).then(async (result) => {
                    const saveTransactionData = {
                        tokenId: nftToken,
                        ownerId: props.accounts,
                        transactionHash: result.transactionHash,
                    }
                    const saveTransactionResult = await POST(`/api/v1/raffle/address/save/transaction`, saveTransactionData, props.apiToken);
                    if (saveTransactionResult.result === 'success') {
                        product.address = true;
                        alert('신청이 완료 되었습니다.');
                    } else {
                        alert('신청중 오류가 발생하였습니다.');
                    }
                }).catch(error => {
                    alert('소각 실패');
                    console.log(error);
                });
            } else {
                alert('개인정보 저장중 오류가 발생하였습니다.');
            }
        } catch (e) {
            alert('신청 실패');
            console.log(e);
        }
        modalClose();
    }
    const agreeCheck = (agree) => {
        if (agree) {
            setAgreeState(true);
        } else {
            setAgreeState(false);
        }
    }
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setHomeAddress([data.zonecode, fullAddress]);
        postModalClose();
    }
    const postCodeStyle = {
        display: "block",
        height: "500px",
        background: "#eee"
    };

    useEffect(() => {
        async function getMyRaffleList() {
            const address = props.accounts;
            await POST(`/api/v1/raffle/getMyHistoryRaffle`, {
                address,
                page,
                limit,
            }, props.apiToken).then(async (result) => {
                if (result.result === 'success') {
                    setMyRaffleList(result.data);
                    setTotal(result.total);
                }
            });
        }

        getMyRaffleList();
    }, [props.accounts, props.apiToken, page]);
    return (
        <>
            <div className={styles.my_page}>
                <h2 className={styles.my_page_title}>
                    My Page
                </h2>
                <div className={styles.my_page_title_sub}>래플 이용 내역</div>
                <div className={styles.raffle_list}>
                    {
                        myRaffleList.map((item, index) => (
                            <div key={index} className={styles.raffle_item}>
                                <div className={styles.left}>
                                    <img src={item.image_url} alt={`${item.title} img`}/>
                                    <div className={styles.raffle_info}>
                                        <div>
                                            <span>{item.round}회차</span> {item.round_date}
                                        </div>
                                        <h6>{item.title}</h6>
                                        <p>{item.price.toLocaleString('ko-KR')}<span>KANV</span></p>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.raffle_status}>
                                        응모횟수 : {item.raffle_count}<br/><br/>
                                        {item.prize ? (
                                            "당첨"
                                        ) : (
                                            "미당첨"
                                        )}
                                    </div>
                                    {item.prize ? (
                                        item.address ? (
                                            <button
                                                onClick={() => viewAddressFormFadeIn(item.productTokenID, item.is_need_address)}
                                                className={styles.disable_btn}>배송지 주소 확인</button>
                                        ) : (
                                            <button
                                                onClick={() => addressFormFadeIn(item.productTokenID, item.is_need_address, item)}
                                                className={styles.raffle_btn}>배송지 주소 입력</button>
                                        )
                                    ) : (
                                        <></>
                                    )}

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Pagination
                total={total}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            <Modal size="lg" show={modalShow} onHide={modalClose}>
                <Modal.Header>
                    <Modal.Title className="mx-auto">My Ticket 신청하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.term_box}>
                        <span className={styles.pop_title}><img src={popIcon} alt={"paper icon"}/> 개인정보수집약관</span>
                        <p className={styles.term_text}>
                            개인 정보 수집·이용 동의<br/>
                            <br/>
                            수집된 회원님의 개인 정보는 본인 확인 및 상품 지급 이외의 목적으로 활용되지 않습니다.<br/>
                            <br/>
                            · 개인 정보 수집·이용 동의(필수)<br/>
                            - 수집 및 이용 목적 : 본인 확인 및 상품 지급<br/>
                            - 수집 항목 : 이름, 주소, 휴대폰 번호, 카이카스 지갑 주소<br/>
                            - 보유 및 이용 기간 : 이벤트 종료 후 30일 동안 보유하며, 원칙적으로 개인 정보의 수집 및 이용 목적이 달성 되면 지체 없이 파기함<br/>
                            <br/>
                            ※ 개인정보 수집·이용에 대하여 동의를 거부할 권리를 가지고 있으며, 개인정보 수집·이용에 대한 미동의 시 이벤트에 참여하실 수 없습니다.<br/>
                        </p>
                        <input ref={agreeBox}
                               type="checkbox" name={"agree"} onChange={e => {
                            agreeCheck(e.target.checked);
                        }}
                        /> 위 약관에 동의합니다.
                    </div>
                    <div>
                        <span className={styles.pop_title}><img src={popIcon} alt={"paper icon"}/> 개인정보</span>
                        <form>
                            <div className={styles.pop_form}>
                                <label>성명</label>
                                <input ref={formName} style={{width: "250px"}} type={"text"} name={"name"}/>
                            </div>
                            <div className={styles.pop_form}>
                                <label>연락처</label>
                                <select ref={formPhoneNumber1} style={{width: "100px"}} name={"ph1"}>
                                    <option value={""}>선택</option>
                                    <option value={"010"}>010</option>
                                    <option value={"011"}>011</option>
                                    <option value={"016"}>011</option>
                                    <option value={"017"}>017</option>
                                    <option value={"018"}>017</option>
                                    <option value={"019"}>017</option>
                                </select>-
                                <input ref={formPhoneNumber2} maxLength={4} style={{width: "100px"}} type={"text"}
                                       name={"ph2"}/> -
                                <input ref={formPhoneNumber3} maxLength={4} style={{width: "100px"}} type={"text"}
                                       name={"ph3"}/>
                            </div>
                            {postUseState &&
                                <div className={styles.pop_form}
                                     style={{display: "flex", borderBottom: "3px solid #999"}}>
                                    <label>주소</label>
                                    <div style={{width: "calc(100% - 120px)"}}>
                                        <button type={"button"} onClick={postModalOpen}>주소검색</button>
                                        <input ref={formPostZip} type="text" name={"post"} value={homeAddress[0] || ''}
                                               placeholder="우편번호"
                                               readOnly/><br/>
                                        <input ref={formPostAddress} style={{width: "calc(100% - 20px)"}} type="text"
                                               name={"address1"} value={homeAddress[1] || ''} placeholder="주소"
                                               readOnly/><br/>
                                        <input ref={formPostAddress2} style={{width: "calc(100% - 20px)"}} type="text"
                                               name={"address2"} placeholder="상세주소"/>
                                    </div>
                                </div>
                            }
                        </form>
                        <span style={{color: "red"}}>* 신청이 완료되면 보유한 NFT는 소각 처리됩니다.</span><br/>
                        <span style={{color: "red"}}>* TokenID : #{productTokenId}</span><br/>
                        <div className={styles.btnBox}>
                            <button onClick={modalClose}>
                                취소
                            </button>
                            <button onClick={() => {
                                addressSend(productTokenId)
                            }}>
                                제출
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/*주소 모달*/}
            <Modal show={postModalShow} onHide={postModalClose} className={"postModal"}>
                <DaumPostcode style={postCodeStyle} onComplete={handlePostCode}/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        postModalClose()
                    }}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*배송정보 확인 모달*/}
            <ShippingView shippingView={shippingView} setShippingView={setShippingView} productTokenId={productTokenId}
                          postUse={postUseState} apiToken={props.apiToken} address={props.accounts}
                          setProductTokenId={setProductTokenId}/>
        </>
    )
}

export default MyPage
