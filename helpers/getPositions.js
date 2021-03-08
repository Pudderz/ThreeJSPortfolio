export function getNewPosition(speed) {

}

export function workOutPicturePosition(index, distance, currentPosition, attractMode, size) {
    const newDistance = 1 - Math.min(Math.abs(currentPosition - index), 1) ** 2;
    const newPosition = index * 1.2 - currentPosition * 1.2;
    const fromCenter = attractMode ? 1 : distance;
    const scale = (1 + 0.08 * fromCenter) * size  * 1.3;
    return {newDistance, newPosition, fromCenter, scale}
}