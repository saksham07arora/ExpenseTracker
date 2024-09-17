

const TranactionCard = ({transaction}) =>{
    return(
        <tr className='py-2 text-lg border-2' >
            <td className="text-center">{transaction.transactionid}</td>
            <td className='px-5 py-2'>{transaction.category}</td>
            <td className='px-5 py-2'>{transaction.amount}</td>
            <td className='px-5 py-2'>{transaction.date}</td>
            <td className='px-5 py-2'>{transaction.note}</td>
            <td className='px-5 py-2'>Edit / Delete</td>
        </tr>
    )
}

export default TranactionCard;