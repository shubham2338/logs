import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const logList= [
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-5678 2023-12-05T17:30:00 192.168.1.8 2 days, 10 hours 75 ms Connection error"},
  {"status": 1, "log": "DAE-9101 2023-12-05T18:15:00 192.168.1.9 7 days, 5 hours 40 ms Data transfer complete"},
  {"status": 1, "log": "DAE-1122 2023-12-05T19:00:00 192.168.1.10 1 day, 15 hours 60 ms Authentication failure"},
  {"status": 1, "log": "DAE-3344 2023-12-05T19:45:00 192.168.1.11 3 days, 20 hours 55 ms System update successful"},
  {"status": 1, "log": "DAE-5566 2023-12-05T20:30:00 192.168.1.12 6 days, 8 hours 70 ms Hardware malfunction"},
  {"status": 1, "log": "DAE-7788 2023-12-05T21:15:00 192.168.1.13 4 days, 12 hours 45 ms Network connection restored"},
  {"status": 1, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1122 2023-12-05T22:45:00 192.168.1.15 2 days, 18 hours 65 ms Application upgrade completed"},
  {"status": 1, "log": "DAE-3344 2023-12-05T23:30:00 192.168.1.16 8 days, 14 hours 55 ms Unexpected shutdown"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 0, "log": "DAE-5678 2023-12-05T17:30:00 192.168.1.8 2 days, 10 hours 75 ms Connection error"},
  {"status": 1, "log": "DAE-9101 2023-12-05T18:15:00 192.168.1.9 7 days, 5 hours 40 ms Data transfer complete"},
  {"status": 0, "log": "DAE-1122 2023-12-05T19:00:00 192.168.1.10 1 day, 15 hours 60 ms Authentication failure"},
  {"status": 1, "log": "DAE-3344 2023-12-05T19:45:00 192.168.1.11 3 days, 20 hours 55 ms System update successful"},
  {"status": 0, "log": "DAE-5566 2023-12-05T20:30:00 192.168.1.12 6 days, 8 hours 70 ms Hardware malfunction"},
  {"status": 1, "log": "DAE-7788 2023-12-05T21:15:00 192.168.1.13 4 days, 12 hours 45 ms Network connection restored"},
  {"status": 0, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 0, "log": "DAE-5678 2023-12-05T17:30:00 192.168.1.8 2 days, 10 hours 75 ms Connection error"},
  {"status": 1, "log": "DAE-9101 2023-12-05T18:15:00 192.168.1.9 7 days, 5 hours 40 ms Data transfer complete"},
  {"status": 0, "log": "DAE-1122 2023-12-05T19:00:00 192.168.1.10 1 day, 15 hours 60 ms Authentication failure"},
  {"status": 1, "log": "DAE-3344 2023-12-05T19:45:00 192.168.1.11 3 days, 20 hours 55 ms System update successful"},
  {"status": 0, "log": "DAE-5566 2023-12-05T20:30:00 192.168.1.12 6 days, 8 hours 70 ms Hardware malfunction"},
  {"status": 1, "log": "DAE-7788 2023-12-05T21:15:00 192.168.1.13 4 days, 12 hours 45 ms Network connection restored"},
  {"status": 0, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 0, "log": "DAE-5678 2023-12-05T17:30:00 192.168.1.8 2 days, 10 hours 75 ms Connection error"},
  {"status": 1, "log": "DAE-9101 2023-12-05T18:15:00 192.168.1.9 7 days, 5 hours 40 ms Data transfer complete"},
  {"status": 1, "log": "DAE-1122 2023-12-05T19:00:00 192.168.1.10 1 day, 15 hours 60 ms Authentication failure"},
  {"status": 1, "log": "DAE-3344 2023-12-05T19:45:00 192.168.1.11 3 days, 20 hours 55 ms System update successful"},
  {"status": 1, "log": "DAE-5566 2023-12-05T20:30:00 192.168.1.12 6 days, 8 hours 70 ms Hardware malfunction"},
  {"status": 1, "log": "DAE-7788 2023-12-05T21:15:00 192.168.1.13 4 days, 12 hours 45 ms Network connection restored"},
  {"status": 1, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1122 2023-12-05T22:45:00 192.168.1.15 2 days, 18 hours 65 ms Application upgrade completed"},
  {"status": 1, "log": "DAE-3344 2023-12-05T23:30:00 192.168.1.16 8 days, 14 hours 55 ms Unexpected shutdown"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-5678 2023-12-05T17:30:00 192.168.1.8 2 days, 10 hours 75 ms Connection error"},
  {"status": 1, "log": "DAE-9101 2023-12-05T18:15:00 192.168.1.9 7 days, 5 hours 40 ms Data transfer complete"},
  {"status": 0, "log": "DAE-1122 2023-12-05T19:00:00 192.168.1.10 1 day, 15 hours 60 ms Authentication failure"},
  {"status": 1, "log": "DAE-3344 2023-12-05T19:45:00 192.168.1.11 3 days, 20 hours 55 ms System update successful"},
  {"status": 0, "log": "DAE-5566 2023-12-05T20:30:00 192.168.1.12 6 days, 8 hours 70 ms Hardware malfunction"},
  {"status": 1, "log": "DAE-7788 2023-12-05T21:15:00 192.168.1.13 4 days, 12 hours 45 ms Network connection restored"},
  {"status": 0, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-5678 2023-12-05T17:30:00 192.168.1.8 2 days, 10 hours 75 ms Connection error"},
  {"status": 1, "log": "DAE-9101 2023-12-05T18:15:00 192.168.1.9 7 days, 5 hours 40 ms Data transfer complete"},
  {"status": 1, "log": "DAE-1122 2023-12-05T19:00:00 192.168.1.10 1 day, 15 hours 60 ms Authentication failure"},
  {"status": 1, "log": "DAE-3344 2023-12-05T19:45:00 192.168.1.11 3 days, 20 hours 55 ms System update successful"},
  {"status": 1, "log": "DAE-5566 2023-12-05T20:30:00 192.168.1.12 6 days, 8 hours 70 ms Hardware malfunction"},
  {"status": 1, "log": "DAE-7788 2023-12-05T21:15:00 192.168.1.13 4 days, 12 hours 45 ms Network connection restored"},
  {"status": 1, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-9900 2023-12-05T22:00:00 192.168.1.14 9 days, 6 hours 80 ms Critical system error"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
  {"status": 1, "log": "DAE-1234 2023-12-05T16:45:00 192.168.1.7 5 days, 3 hours 50 ms System operation normal"},
]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [logs, setLogs] = useState([]);
  const handle = ()=>{
    const apiUrl = 'http://127.0.0.1:8081/detect'
      axios.get(apiUrl)
      .then(response => {
        if (response.data instanceof Promise) {
          response.data.then(innerData => {
            console.log('Promise resolved:', innerData);
          }).catch(error => {
            console.error('Promise rejected:', error);
          });
        } else {
          setLogs([...logs, response.data.result]);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  const scrollContainerRef = useRef<HTMLDivElement>(null);
 useEffect(()=>{
    handle();
    if(logList.length){
      scrollContainerRef.current?.scrollIntoView({
        behavior:"smooth",
        block:"end",
      });
    }  
    const timer = setTimeout(()=>{
      setCurrentIndex((prevIndex)=> prevIndex +1)
    }, 1000)
    return () => clearTimeout(timer);

  }, [currentIndex, logList]);

 console.log(logs);

  return (
    <>
  <div className={styles.terminal}>
    <div className={styles.leftBox}>
    {logList.map((l, index)  => (
        <ul key={index} >
          {(l.status!=0)?(
                <li className={styles.normal}>{l.log}</li>
          ):(<li className={styles.notNormal}>{l.log}</li>)}
        </ul>
      ))}
      </div><div ref={scrollContainerRef}/>
    <div className={styles.rightFullBox}>
      <h2>Anomaly Logs</h2>
        <div className={styles.rightBox}>
          {logList.map((l, index)  => (
          <ul key={index} className={styles.termList}>
            {(l.status!=0)?(
                  <li className={styles.abnormal}>{l.log}</li>
            ):<></>}
          </ul>
        ))}
        </div>
        </div>

   </div>
    </>
  )
}
