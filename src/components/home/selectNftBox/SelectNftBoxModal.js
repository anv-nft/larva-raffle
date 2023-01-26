import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap';
import {POST} from "../../../api/api";
import styles from "./SelectNftBoxModal.module.scss"
import iconX from "../../../assets/images/icon/icon_x_s.png";
import Caver from "caver-js";
import {contracts} from "../../../utils/web3/contracts";
import {RAFFLE} from "../../../utils/abi/RAFFLE";
import {ERC20_ABI} from "../../../utils/abi/ERC20";

function SelectNftBoxModal(props) {
    const provider = window['klaytn'];
    const caver = new Caver(provider);
    const RAFFLE_CONTRACT_ADDRESS = contracts['raffle_contract'][props.networkId];
    const KANV_CONTRACT_ADDRESS = contracts['kanv_contract'][props.networkId];
    const LARVA_NFT_CONTRACT_ADDRESS = contracts['pfp_3d_nft_contract'][props.networkId];
    const raffleContract = new caver.klay.Contract(RAFFLE, RAFFLE_CONTRACT_ADDRESS);
    const kanvContract = new caver.klay.Contract(ERC20_ABI, KANV_CONTRACT_ADDRESS);
    const [selectModal, setSelectModal] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [selectedNft, setSelectedNft] = useState("");
    const [selectedNftTokenId, setSelectedNftTokenId] = useState(null);

    function selectNft(e) {
        const box = e.currentTarget;
        if (selectedNft !== "") {
            selectedNft.classList.remove(styles.active);
        }
        setSelectedNft(box);
        setSelectedNftTokenId(box.childNodes[1].childNodes[1].innerText);
        box.classList.add(styles.active);
    }

    function selectComplete() {
        // if (props.selectSequence === 1) {
        //     props.setFirstToken({
        //         id: selectedNft.childNodes[1].childNodes[1].innerText,
        //         img: selectedNft.childNodes[0].src,
        //         character: selectedNft.childNodes[2].innerText,
        //     });
        // } else {
        //     props.setSecondToken({
        //         id: selectedNft.childNodes[1].childNodes[1].innerText,
        //         img: selectedNft.childNodes[0].src,
        //         character: selectedNft.childNodes[2].innerText,
        //     });
        //
        // }
        // props.setSelectBox(false);
    }
// KANV에 대한 어프로브 확인
    async function approveCheck(itemPrice) {
        const approveAmount = await kanvContract.methods.allowance(props.userAddress, RAFFLE_CONTRACT_ADDRESS).call().then(e => {
            return e;
        });
        console.log(approveAmount)
        console.log(itemPrice)
        if (Number.parseFloat(approveAmount) >= Number.parseFloat(itemPrice)) {
            return true;
        } else {
            console.log('실패잖아');
            return false;
        }
    }
    async function raffle() {
        props.item.idx = 0; // todo :  임시처리
        const round = 0; // todo : 라운드
        try {
            // 어프로브 사전 체크
            if (!await approveCheck(props.item.price)) {
                // 비용 만큼 토큰 보유 중인지
                const balanceAmount = await kanvContract.methods.balanceOf(props.userAddress).call();
                if (Number.parseFloat(props.item.price) > Number.parseFloat(balanceAmount)) {
                    props.setAlerts("The KANV is insufficient.");
                    props.setShowAlertModal(true);
                    return false;
                }
                // 어프로브 실행
                try {
                    const gasLimitApprove = await kanvContract.methods.approve(RAFFLE_CONTRACT_ADDRESS, props.item.price).estimateGas({
                        from: props.userAddress,
                    });
                    await kanvContract.methods.approve(RAFFLE_CONTRACT_ADDRESS, props.item.price).send({
                        from: props.userAddress,
                        gas: gasLimitApprove
                    });
                } catch (e) {
                    console.log(e);
                    return false;
                }
            }
            // 래플 실행
            const gasLimit = await raffleContract.methods.joinRaffle(KANV_CONTRACT_ADDRESS, round, props.item.idx, LARVA_NFT_CONTRACT_ADDRESS, selectedNftTokenId).estimateGas({
                from: props.userAddress,
            });
            const gasPrice = await caver.klay.getGasPrice();
            const joinRaffleResult = await raffleContract.methods.joinRaffle(KANV_CONTRACT_ADDRESS, round, props.item.idx, LARVA_NFT_CONTRACT_ADDRESS, selectedNftTokenId).send({
                from: props.userAddress,
                gas: gasLimit,
                gasPrice,
            });
            // events가 있다면 성공한 것
            if('events' in joinRaffleResult){
                props.setAlerts("Raffle Success");
                props.setShowAlertModal(true);
                props.setSelectBox(false);
            }
        } catch (e) {
            console.log(e);
            props.setAlerts("Raffle Fail ");
            props.setShowAlertModal(true);
            props.setSelectBox(false);
        }
    }

    useEffect(() => {
        async function getNft() {
            props.setShowLoading(true);
            const token = props.apiToken;
            const address = props.userAddress;
            await POST(`/api/v1/raffle/getNftList`, {
                address,
            }, token).then(async (result) => {
                let nftList = result.data;
                if (result.result === 'success') {
                    for (let index = 0; index < nftList.length; index++) {
                        const usedCheck = await raffleContract.methods.usedToken(KANV_CONTRACT_ADDRESS, 0, LARVA_NFT_CONTRACT_ADDRESS, parseInt(nftList[index].tokenId, 16)).call().then(e => {
                            return e;
                        })
                        if (usedCheck) {
                            nftList[index].status = 'Used';
                        }
                    }
                    setListItem(nftList);
                    setSelectModal(true);
                }
            });
            props.setShowLoading(false);
        }

        getNft();
    }, [props.selectBox]);
    return (
        <Modal id={styles.myNftBox} centered size="xs" show={selectModal}
               onHide={() => props.setSelectBox(false)}>
            <Modal.Body>
                <div className={styles.select_nft_title}>
                    <h3>
                        My NFT Collection book
                        <div>
                            {(selectedNft) ? (
                                <div className={styles.on_status} onClick={() => raffle()}>
                                    Raffle
                                </div>
                            ) : (
                                <div className={styles.off_status}>
                                    0 / 1
                                </div>
                            )}
                            <img onClick={() => props.setSelectBox(false)} src={iconX} alt="close icon"/>
                        </div>

                    </h3>

                </div>
                <div className={styles.select_nft_box}>
                    {
                        listItem.map((nft) => (
                            (nft.status) ? (
                                <div key={nft.tokenId} className={`${styles.nft_box} ${styles.selected_box}`}>
                                    <img className={styles.nft_img} src={nft.image} alt={nft.tokenId}/>
                                    <span>#<span>{parseInt(nft.tokenId, 16)}</span> Larva</span>
                                    <span className={styles.hide}>{nft.character}</span>
                                    <div className={styles.selected_dim}>{nft.status}</div>
                                </div>
                            ) : (
                                <div key={nft.tokenId} className={styles.nft_box} onClick={(event) => {
                                    selectNft(event)
                                }}>
                                    <img className={styles.nft_img} src={nft.image} alt={nft.tokenId}/>
                                    <span>#<span>{parseInt(nft.tokenId, 16)}</span> Larva</span>
                                </div>
                            )
                        ))
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SelectNftBoxModal
