#! /bin/bash
fruit="apple"

case $fruit in 
	"apple")
		echo "this is a red one"
		;;
	"banana")
		echo "this is a yellow one"
		;;
	*)
		echo "unknown one"
		;;
esac
