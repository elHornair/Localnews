<?php

class PointInPolygon {

    /*
     * Determines whether a point is within a polygon
     * @param array $P a polygon (array of points)
     * @param array $q a point (associative array with x and y value)
     * @return int 1 if $q is within $P, -1 if it's outside, 0 if it's on a border
     */
    static function isPointInPolygon($P, $q) {

        // close polygon
        $P[] = $P[0];
        $testRes = -1;

        for ($i = 0; $i < count($P)-1; $i++) {
            $testRes = $testRes * PointInPolygon::crossLineTest($q, $P[$i], $P[$i+1]);
        }

        return $testRes;
    }

    /*
     * Checks whether a horizontal line starting from $A crosses the line defined between $B and $C
     * @param array $A the point of interest
     * @param array $B the start point of the line
     * @param array $C the end point of the line
     * @return int -1 if the line will be crossed, 1 if it won't, 0 if the point is on the line
     */
    static function crossLineTest($A, $B, $C) {

        // check if the three points are on one horizontal line
        if ($A['y'] == $B['y'] && $A['y'] == $C['y']) {
            if (($B['x'] <= $A['x'] && $A['x'] <= $C['x']) || ($C['x'] <= $A['x'] && $A['x'] <= $B['x'])) {
                return 0;
            } else {
                return 1;
            }
        }

        // make sure Cy is always bigger than By
        if ($C['y'] <= $B['y']) {
            $temp = $C;
            $C = $B;
            $B = $temp;
        }

        // if the points y-value is lower or higher than the whole line, it can't cross the line on the x-axis
        if ($A['y'] <= $B['y'] || $C['y'] <= $A['y']) {
            return 1;
        }

        // check if the point will cross the line moving to the right
        $delta = ($B['x'] - $A['x']) * ($C['y'] - $A['y']) - ($B['y'] - $A['y']) * ($C['x'] - $A['x']);
        if ($delta > 0) {
            return -1;
        } elseif ($delta < 0) {
            return 1;
        } else {
            return 0;
        }
    }

}
