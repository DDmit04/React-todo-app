import {Task, TasksSortingDirection, TasksSortingField} from "../types/Task";

export const SortTasks = (tasks: Task[], sortField: TasksSortingField, direction: TasksSortingDirection): Task[] => {
    tasks.sort((tskA, tskB) => {
        switch (sortField) {
            case TasksSortingField.CREATION_DATE:
                return CompareDate(tskA.creationDate, tskB.creationDate)
                break
            case TasksSortingField.DESCRIPTION:
                if (tskA.description === tskB.description) {
                    return CompareDate(tskA.creationDate, tskB.creationDate)
                } else {
                    CompareString(tskA.description, tskB.description)
                }
                return CompareString(tskA.description, tskB.description)
                break
            case TasksSortingField.START_DATE:
                if (tskA.start === tskB.start) {
                    return CompareDate(tskA.creationDate, tskB.creationDate)
                } else {
                    return CompareDate(tskA.start, tskB.start)
                }
                return CompareDate(tskA.start, tskB.start)
                break
            case TasksSortingField.END_DATE:
                if (tskA.end === tskB.end) {
                    return CompareDate(tskA.creationDate, tskB.creationDate)
                } else {
                    return CompareDate(tskA.end, tskB.end)
                }
                return CompareDate(tskA.end, tskB.end)
                break
            case TasksSortingField.COMPLETED:
                if (tskA.completed === tskB.completed) {
                    return CompareDate(tskA.creationDate, tskB.creationDate)
                } else {
                    return CompareBool(tskA.completed, tskB.completed)
                }
                return CompareBool(tskA.completed, tskB.completed)
                break
        }
    })
    if(direction === TasksSortingDirection.DESC) {
        tasks.reverse()
    }
    return tasks
}

function CompareString(strA: string, strB: string) {
    return strA >= strB ? 1 : -1
}
function CompareBool(boolA: boolean, boolB: boolean) {
    return boolA >= boolB ? 1 : -1
}
function CompareDate(dateA: Date, dateB: Date) {
    return dateA >= dateB ? 1 : -1
}