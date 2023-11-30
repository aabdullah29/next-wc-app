"use client";

import styles from "../../../page.module.css";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useToken,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import SendERC20 from "../../SendERC20";
import { disconnect } from "@wagmi/core";
import {
  nativeCurrency,
  chainsData,
  allChains,
} from "../../../utils/chainAndTokens";
import { useRouter } from "next/navigation";

export default function Home({
  params,
}: {
  params: {
    chain: string;
    token: string;
  };
}) {
  const [selectedChain, token] = [
    decodeURIComponent(params.chain),
    params.token,
  ];
  const tokenName = token.substring(0, token.indexOf("_"));
  const tokenAmount = token.substring(token.indexOf("_") + 1, token.length);

  const router = useRouter();
  const [callFunction, setCallFunction] = useState<string>("");
  const [connectButton, setConnectButton] = useState<Boolean>(false);

  const { chain } = useNetwork();
  const {
    chains,
    error: errorSwitchNetwork,
    isLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();

  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount();

  const { config, error } = usePrepareSendTransaction({
    to: chainsData[selectedChain]?.toAddress,
    value: parseEther(tokenAmount),
  });
  const { sendTransaction, isSuccess, data, isError } =
    useSendTransaction(config);

  const currentNetworkId = allChains.find(
    (chain) => selectedChain === chain.name
  )?.id;

  useEffect(() => {
    setConnectButton(false);
    // at page reload
    return () => {
      setTimeout(() => {
        disconnect().then(() => {
          if (isDisconnected) {
            console.log("++disconnect++");
            // router.back();
          }
          setConnectButton(true);
        });
      }, 800);
    };
  }, []);

  useEffect(() => {
    console.log(`
    \nisDisconnected: ${isDisconnected}
    \nselectedNetworkId: ${selectedNetworkId}
    \nfromAddress: ${address}
    \ntoAddress: ${chainsData[selectedChain]?.toAddress}`);

    if (
      selectedNetworkId != currentNetworkId?.toString() ||
      (currentNetworkId === 1 && Number(selectedNetworkId) !== 1)
    ) {
      disconnect().then(() => {
        console.log(
          "++disconnect++ Network is not same.",
          selectedNetworkId,
          currentNetworkId
        );
        setConnectButton(true);
      });
    } else if (
      address &&
      selectedNetworkId &&
      !isDisconnected &&
      selectedNetworkId == currentNetworkId?.toString()
    ) {
      setTimeout(() => {
        if (
          nativeCurrency[tokenName] &&
          callFunction !== "call" &&
          callFunction !== "done"
        ) {
          if (sendTransaction) {
            console.log("::::sending coin::", nativeCurrency[tokenName]);
            sendTransaction?.();
            setCallFunction("call");
          }
        } else if (tokenName !== "erc") {
          console.log("::::sending erc20::");
          setCallFunction("call");
        }
      }, 1500);
    }
  }, [address, selectedNetworkId, isDisconnected, tokenName, sendTransaction]);

  useEffect(() => {
    if (isSuccess || isError) {
      console.log("isSuccess , isError :::: ", isSuccess, isError);
      console.log("tx data:::: ", JSON.stringify(data));
      (async () => {
        await disconnect();
        router.back();
      })();
    }
  }, [isSuccess, isError, callFunction]);

  return (
    <main className={styles.main}>
      {
        <div className={styles.description}>
          {tokenName && !nativeCurrency[tokenName] && selectedNetworkId && (
            <SendERC20
              {...{
                tokenName: tokenName,
                tokenAmount: tokenAmount,
                senderAddrss: address,
                chainId: Number(selectedNetworkId),
                callFunction: callFunction,
                setCallFunction: setCallFunction,
              }}
            />
          )}
        </div>
      }

      <div className={styles.description}></div>
      <div className={styles.center}>
        {tokenName && connectButton && (
          <w3m-button balance={"show"} size={"md"}></w3m-button>
        )}
        {/* {
          <button
            disabled={!switchNetwork}
            onClick={() =>
              switchNetwork?.(
                allChains.find((chain) => selectedChain === chain.name)?.id
              )
            }
          >
            {selectedChain}
          </button>
        } */}
        {/* <button onClick={disconnect}>Disconnect</button> */}
      </div>
      <div className={styles.grid}></div>
    </main>
  );
}
