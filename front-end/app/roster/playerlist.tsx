import { useAppContext } from "@/app/context"
import { useState } from "react"
import Player from "../classes/player"
import { useTable, Column } from "react-table"
import { useRouter } from "next/navigation"

export default function Playerlist() {
    const defaultOpenPosition = new Map([
        ["QB", true],
        ["WR", true],
        ["RB", true],
        ["TE", true],
        ["OL", true],
        ["DL", true],
        ["LB", true],
        ["CB", true],
        ["S", true],
        ["K", true],
        ["P", true]
    ])

    const {roster, setRoster} = useAppContext()
    const [openPosition, setOpenPosition] = useState<Map<string, boolean>>(defaultOpenPosition)

    const togglePosition = (position: string) => {
        const tempMap = new Map(openPosition)
        tempMap.set(position, !openPosition.get(position))
        setOpenPosition(tempMap)
    }

    const columns: Column<{ name: string; player: Player }>[] = [
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ row }) => {
                const router = useRouter()
          
                const handlePlayerClick = () => {
                    router.push(`/players/${row.original.name.toLowerCase().replace(" ", "-")}`)
                }
                return (
                    <span onClick={handlePlayerClick} className="hover:underline cursor-pointer">{row.original.name}</span>
                )
            }
        },
        {
            Header: "Age",
            accessor: (row) => row.player.attributes.age,
        },
        {
            Header: "Skill",
            accessor: (row) => row.player.attributes.skill,
        },
        {
            Header: "Speed",
            accessor: (row) => row.player.attributes.speed,
        },
        {
            Header: "Strength",
            accessor: (row) => row.player.attributes.strength,
        },
        {
            Header: "Endurance",
            accessor: (row) => row.player.attributes.endurance,
        },
        {
            Header: "Overall",
            accessor: (row) => row.player.attributes.overall,
        },
        {
            Header: "Level",
            accessor: (row) => row.player.attributes.level,
        },
        {
            Header: "EXP",
            accessor: (row) => row.player.attributes.expString,
        },
        {
            Header: "Contract",
            accessor: (row) => row.player.contractString,
        },
        {
            Header: "Injury",
            accessor: (row) => row.player.injuryWeeksString,
        }
    ]


    return(
        <div>
            {Array.from(roster.keys()).map((position: string) => (
                <div key={position} className="">
                    <button onClick={() => togglePosition(position)} className="bg-gray-800 w-full h-10 mb-1">{position}</button>
                    {openPosition.get(position) && (
                        <div>
                            <PlayerTable players={Array.from(roster.get(position)!.entries()).map(([name, player]) => ({name, player})) || []} columns={columns}/>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

function PlayerTable({ players, columns }: { players: { name: string; player: Player }[]; columns: Column<{ name: string; player: Player }>[] }) {
    const data = players;
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })
  
    return (
        <table {...getTableProps()} className="w-full text-left table-auto mb-1" style={{ tableLayout: "fixed" }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                            <th
                                {...column.getHeaderProps()}
                                className="border p-2 bg-gray-700 text-white"
                                style={{width: index === 0 || index === 9 ? "10%" : `${70 / (headerGroup.headers.length - 1)}%`}}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <td
                                {...cell.getCellProps()}
                                className="border p-2"
                            >
                            {cell.render("Cell")}
                            </td>
                        ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}