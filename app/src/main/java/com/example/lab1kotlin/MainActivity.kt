package com.example.lab1kotlin

import android.content.res.Resources
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        val textView: TextView = findViewById(R.id.textView)
        val button: Button = findViewById(R.id.button)
        val button2: Button = findViewById(R.id.buttonPlayMore)
        val editText: EditText = findViewById(R.id.editTextNumber)

        var random = (1..100).random()
        var gameOver = false

        button.setOnClickListener{
            val returned = onClickBtn(editText, textView, random)
            if (returned){
                Toast.makeText(this,
                    "Вы угадали!",
                    Toast.LENGTH_LONG
                ).show()
                gameOver = returned
            }
        }
        button2.setOnClickListener{
                random = (1..100).random()
                gameOver = false
        }
    }

    private fun onClickBtn(editText: EditText, textView: TextView, random: Int): Boolean {
        val number: Int = editText.text.toString().toIntOrNull() ?: 0
        if (numIsCorrect(editText) != "" || number == 0) {
            textView.text = Resources.getSystem().getString(R.string.error)
            Toast.makeText(this,
                numIsCorrect(editText),
                Toast.LENGTH_LONG
            ).show()
            return false
        }
        if (number == random) {
            textView.text = Resources.getSystem().getString(R.string.hit)
            return true
        }
        else if (number > random) {
            textView.text = Resources.getSystem().getString(R.string.ahead)
        }
        else {
            textView.text = Resources.getSystem().getString(R.string.behind)
        }
        return false
    }

    private fun numIsCorrect(editText: EditText): String {
        if (editText.text.toString().toIntOrNull() == null) {
            return "Вы не ввели число"
        }
        val number: Int = editText.text.toString().toInt()
        if (number < 1 || number > 100) {
            return "Нужно ввести число от 1 до 100!"
        }
        return ""
    }


}