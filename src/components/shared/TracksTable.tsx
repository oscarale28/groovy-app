"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { formatDuration } from "@/lib/utils";
import { Track } from "@/lib/types";
import TrackDropdown from "./TrackDropdown";

interface TracksTableProps {
  tracks: Track[];
}

const TracksTable = ({ tracks }: TracksTableProps) => {
  return (
    <Table className="text-md">
      <TableBody>
        {tracks.map((track, i) => (
          <TableRow key={track.id} className="rounded-lg!">
            <TableCell className="text-muted-foreground py-4 ps-4">{i + 1}</TableCell>
            <TableCell>{track.name}</TableCell>
            <TableCell className="text-right text-muted-foreground pe-4">
              <div className="flex items-center justify-end gap-x-4">
                {formatDuration(track.duration_ms)}
                <TrackDropdown track={track} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TracksTable;